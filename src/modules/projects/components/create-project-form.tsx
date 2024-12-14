"use client"

import { Card, CardContent } from '@/modules/core'
import { createProjectSchema, createProjectSchemaType, ProjectForm } from '@/modules/projects'
import { zodResolver } from '@hookform/resolvers/zod'
import React, { useState } from 'react'
import { useForm } from 'react-hook-form'

interface Props {
  className?: string
}

export const CreateProjectForm = ({
  className
}: Props) => {
  const [isLoading, setIsLoading] = useState(false)
  const form = useForm<createProjectSchemaType>({
    resolver: zodResolver(createProjectSchema),
    defaultValues: {
      name: "",
      description: "",
      maxWorkers: "0",
      technologies: ""
    }
  })

  const handlesubmit = async (data: createProjectSchemaType) => {
    setIsLoading(true)
    console.log(data)
    setTimeout(() => setIsLoading(false), 2000)
  }

  return (
    <Card className={`w-full ${className}`}>
      <CardContent className="mt-4">
        <ProjectForm form={form} handlesubmit={handlesubmit} isLoading={isLoading} />
      </CardContent>
    </Card>
  )
}
